import { useForm } from 'react-hook-form';
import { createTasks, deleteTask, uptdateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export function TasksFormPage(){

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        setValue,
    } = useForm()
    const navigate = useNavigate();
    /* con useParams lo que hacemos es solicitar los parametros, en este caso capturamos el id de la task para saber si se esta en una existente o nueva */
    const params = useParams();
    /* yup y zod son dos bibliotecas mas que podria usar para el registro de datos, principalmente para validacion de datos */

    /* onSubmit es cuando le damos a guardar a los datos, mediante navigate volvemos a la pagina de tasks */

    const onSubmit = handleSubmit(async (data) => {
        if (params.id){
            console.log('Actualizando')
        }else{
            const res = await createTasks(data);
        }
        navigate("/tasks");
    });
    useEffect(()=>{
        async function loadTask(){
            if (params.id) {
                const res = await getTask(params.id);
                setValue('tittle', res.data.tittle)
                setValue('description', res.data.description)
            }
        }
        loadTask();
    }, [])
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                type="text"  
                placeholder="Titulo"
                {...register("tittle", { required: true } )}
                />
                {errors.title && <span>El titulo es necesario </span>}
                <textarea 
                rows="3 " 
                name="" id="" 
                placeholder="Descripcion"
                {...register("description", { required: true } )}></textarea>
                {errors.description && <span>La descripcion es necesaria </span>}

                <button>Guardar</button>
            </form>
            {params.id && <button onClick={async()=>{
                const aceptado = window.confirm('¿Estas seguro?')
                if (aceptado) {
                    await deleteTask(params.id);
                    navigate('/tasks');
                }
            }}>Borrar</button>}
        </div>
    )
}