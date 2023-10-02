const { Todo } = require("../models");

class todoController {
    
	static async getTask(req, res, next) {
		try {
			
			const result = await Todo.findAll();

			res.status(200).json(result)

		} catch (err) {
			console.log(err);
			next(err);
		}
	}

    static async getActiveTask(req, res, next) {
        try {
            const result = await Todo.findAll({
                where: { status: 'active' },
            });
    
            if (!result || result.length === 0) {
                throw { title: "not found" };
            }
    
            res.status(200).json(result);
    
        } catch (err) {
            next(err);
        }
    }

    static async getCompleteTask(req, res, next) {
        try {
            const result = await Todo.findAll({
                where: { status: 'completed' },
            });
    
            if (!result || result.length === 0) {
                throw { title: "not found" };
            }
    
            res.status(200).json(result);
    
        } catch (err) {
            next(err);
        }
    }

	static async addTask(req, res, next) {
        console.log('add=', req.body);
    
        try {
            const { title } = req.body;
    
            // Ensure the status is set to "active" when creating the task
            const result = await Todo.create({
                title: title,
                status: 'active'
            });
    
            res.status(201).json(result);
    
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

	static async editTask(req, res, next) {
		try {
			const id = Number(req.params.id)

			const { title } = req.body

			const target = await Todo.findOne({ where: { id: id || null } });

			if (!target) {
				throw { title: "not found" };
			}

			await Todo.update(
				{
					title,
					
				},
				{
					where: { id: id || null },
				}
			);

			res.status(200).json({ message: `task with id ${id} has been updated!` })

		} catch (err) {
			next(err);
		}
	}

    static async editStatus(req, res, next) {
        try {
            const id = Number(req.params.id);
    
            // Validate ID
            if (!id) {
                throw { message: "Invalid ID provided" };
            }
    
            const [affectedRows] = await Todo.update(
                { status: "completed" },
                { where: { id } }
            );
    
            // If no rows are updated, it means the Todo was not found
            if (affectedRows === 0) {
                throw { message: "Todo not found" };
            }
    
            res.status(200).json({ message: `task with id ${id} has been completed!` });
    
        } catch (err) {
            next(err);
        }
    }

	static async deleteTask(req, res, next) {
		console.log("delete");

		try {
			const id = Number(req.params.id);

			const target = await Todo.findOne({ where: { id: id || null } });

			if (!target) {
				throw { title: "not found" };
			}
			await Todo.destroy({ where: { id }})


			res.status(200).json({ message: `Task with id ${id} has been deleted!` })

		} catch (err) {
			next(err);
            
		}
	}
}

module.exports = todoController;