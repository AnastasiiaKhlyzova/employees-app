import { Outlet } from 'react-router-dom';
import Container from './components/base/Container/Container';
import Row from './components/base/Row/Row';
import Col from './components/base/Col/Col';

function App() {
  return (
    <Container className="mt-4 ">
      <Row>
        <Col>
          <h1 className="mb-4 ps-3">Система управления персоналом</h1>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
