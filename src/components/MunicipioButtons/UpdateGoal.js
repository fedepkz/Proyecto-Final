import React, { useContext, useState} from "react";
import { Form, Button, Image, Modal, Spinner } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import firewareApi from "../../services/fiwareApi"

//agregar POST

const AddGoalButton = ({ item }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function AddGoalModal() {
        const [animate, setAnimate] = useState(false);

        const [datos, setDatos] = useState({
        });

        const handleChangeDatos = (value, prop) => {
            setDatos({ ...datos, [prop]: value });
        };

        const {setUpdate} = useContext(UpdateContext);
        async function handleSubmit() {

            const data = await createGoal(item.id)
            async function createGoal(id) {
                return await firewareApi.postNewGoal(datos, id)
            }

            if (data) {
                alert("Meta de " + JSON.stringify(item.name) + " fue agregada exitosamente")
                handleClose();
                setUpdate(state=>!state)
            } else {
                setAnimate(false);
                alert("Error");
            }
        }

        return (
            <div className="container-login">
                <Image
                    src="https://pbs.twimg.com/media/EGnVk29XYAMpxVX.jpg"
                    fluid
                    className="centered-image"
                />
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setAnimate(true);
                        handleSubmit();
                    }}
                >
                    <Form.Group className="mb-3" controlId="formMetaMonto">
                        <Form.Label>Monto esperado:</Form.Label>
                        <Form.Control
                            required
                            type="Integer"
                            placeholder="Monto"                                //ver VALIDATIONS!!!!!!!!!!!!
                            onChange={(monto) => {
                                handleChangeDatos(monto.target.value, "monto");
                            }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMetaFecha">
                        <Form.Label>Fecha limite:</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder="Fecha"                                //ver VALIDATIONS!!!!!!!!!!!!
                            onChange={(goalFecha) => {
                                handleChangeDatos(goalFecha.target.value, "goalFecha");
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Button
                            variant="primary"
                            type="submit"
                            size="lg"
                            className={"full-width"}
                        >
                            {animate ? (
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            ) : (
                                ""
                            )}
                            {!animate ? "Agregar meta" : "Loading..."}
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }

    return (
        <>
            <Button className="btn-load-goal" onClick={handleShow}>
                Cargar Meta
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <AddGoalModal />
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddGoalButton;