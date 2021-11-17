import React, { useEffect, useState, useContext } from "react";
import { ShowDataList } from "../../components/ShowDataList";
import fiwareApi from "../../services/fiwareApi";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { UserContext } from "../../context/user-context";
import { UpdateContext } from "../../context/update-context";
import { Redirect, useHistory } from "react-router-dom";
import { GoGraph } from "react-icons/go";
import { Roles } from "../../enums/Roles";

export const MunicipioEntitiesScreen = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const { setUpdate } = useContext(UpdateContext);
  const history = useHistory();

  useEffect(() => {
    const municipio = user.usMunicipio;
    if (user.usRole === Roles.municipio) {
      async function getEntities() {
        const entities = await fiwareApi.getDataByQuery(
          "refMunicipio==" + municipio
        );
        setData(entities);
      }
      getEntities();
    } else {
      <Redirect to="" />;
    }
    setUpdate();
  }, [setUpdate, user.usRole, user.usMunicipio]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="text-center smartFontModal">
              <Card.Header>LISTADO DE EJES</Card.Header>
              <Button
                variant="warning"
                onClick={() => {
                  history.push("/show-graph");
                }}
              >
                <GoGraph /> Ver grafico
              </Button>
              <Card.Body>
                <ShowDataList array={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
