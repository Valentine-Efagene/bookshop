import Container from "react-bootstrap/Container";

function NoMatch() {
  return (
    <Container
      fluid
      className="d-flex flex-column text-center justify-content-center align-items-center"
    >
      <h1>Not Found</h1>
      <p className="text-muted">404</p>
    </Container>
  );
}

export default NoMatch;
