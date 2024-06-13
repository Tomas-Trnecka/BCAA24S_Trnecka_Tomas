import { useContext } from "react";
import { useParams } from "react-router-dom";
import { FinderContext } from "./FinderContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

// Logos
import intelLogo from "./assets/intel.png";
import amdLogo from "./assets/amd.png";
import nvidiaLogo from "./assets/nvidia.png";

function HardwareDetail() {
  const { id } = useParams();
  const { eventList } = useContext(FinderContext);

  const hardwareItem = eventList.find((item) => item.id === id);

  if (!hardwareItem) {
    return <div className="text-center">Hardware not found</div>;
  }

  return (
    <Container className="mt-4">
      <Card className="shadow">
        <Card.Body>
          <Row>
            <Col xs={12} md={4} className="text-center">
              {hardwareItem.name.includes("Intel") && (
                <img src={intelLogo} alt="Intel Logo" style={{ height: 100 }} />
              )}
              {hardwareItem.name.includes("AMD") && (
                <img src={amdLogo} alt="AMD Logo" style={{ height: 100 }} />
              )}
              {hardwareItem.name.includes("NVIDIA") && (
                <img
                  src={nvidiaLogo}
                  alt="NVIDIA Logo"
                  style={{ height: 50 }}
                />
              )}
            </Col>
            <Col xs={12} md={8}>
              <h2>{hardwareItem.name}</h2>
              <p className="mb-2">
                <strong>Type:</strong> {hardwareItem.type.toUpperCase()}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${hardwareItem.price}
              </p>
              <p className="mb-2">
                <strong>Ranking:</strong> {hardwareItem.ranking}
              </p>
              <p className="mb-2">
                <strong>VRAM:</strong> {hardwareItem.vram} GB
              </p>
              <p className="mb-2">
                <strong>Memory Type:</strong> {hardwareItem.memoryType}
              </p>
              <p className="mb-2">
                <strong>Frequency:</strong> {hardwareItem.frequency} MHz
              </p>
              <p className="mb-2">
                <strong>Bus:</strong> {hardwareItem.bus} bit
              </p>
              <p className="mb-2">
                <strong>Power:</strong> {hardwareItem.power} W
              </p>
              {/* Comments */}
              {hardwareItem.comments != null &&
                hardwareItem.comments.length > 0 && (
                  <>
                    <h4 className="mt-4">Comments:</h4>
                    {hardwareItem.comments.map((comment) => (
                      <Card key={comment.id} className="mt-2">
                        <Card.Body>
                          <p>{comment.text}</p>
                          <p>
                            <strong>Rating:</strong> {comment.rating}
                          </p>
                        </Card.Body>
                      </Card>
                    ))}
                  </>
                )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default HardwareDetail;
