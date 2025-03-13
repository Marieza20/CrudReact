async function get() {
    try {
        const response = await fetch("http://localhost:3000/tareas", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error fetching tareas');
        }

        const tareas = await response.json();
        return tareas;
    } catch (error) {
        console.error('Error fetching tareas:', error);
        throw error;
    }
}


//////////LLAMADO POST//////////
async function post(nombre,estado) {
    try {
        const tareaData = { 
            nombre,
            estado
        };

        const response = await fetch("http://localhost:3000/tareas", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tareaData)
        });
     
        return await response.json();
    } catch (error) {
        console.error('Error posting tarea:', error);
        throw error;
    }
}


//////////////LLAMADO UPDATE/////////////
async function update(nombre,estado,id)
{
    try {
        const tareaData = { 
            nombre,
            estado
        };

        const response = await fetch("http://localhost:3000/tareas/"+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tareaData)
        });

        return await response.json();
    } catch (error) {
        console.error('Error update tarea:', error);
        throw error;
    }
}


//////////////LLAMADO DELETE/////////////
async function deleteT(id) {
    try {
        const response = await fetch(`http://localhost:3000/tareas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting tarea with id ${id}`);
        }

        return { message: `Tarea with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting tarea:', error);
        throw error;
    }
}

export default { get, post, update, deleteT};