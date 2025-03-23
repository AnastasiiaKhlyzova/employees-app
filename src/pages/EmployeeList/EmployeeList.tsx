import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import Container from '../../components/base/Container/Container';
import Row from '../../components/base/Row/Row';
import Col from '../../components/base/Col/Col';
import Button from '../../components/base/Button/Button';
import Card from '../../components/base/Card/Card';
import FormGroup from '../../components/base/FormGroup/FormGroup';
import Label from '../../components/base/Label/Label';
import { MemoizedArchiveFilter } from './ArchiveFilter';
import { MemoizedRoleFilter } from './RoleFilter';
import { MemoizedSortFieldFilter } from './SortFieldFilter';
import { MemoizedSortDirectionFilter } from './SortDirectionFilter';

const EmployeesList: React.FC = () => {
  const navigate = useNavigate();
  const filteredList = useSelector(
    (state: RootState) => state.employees.filteredList,
  );

  const handleEditEmployee = (id: number) => {
    navigate(`/employees/${id}`);
  };

  const handleAddEmployee = () => {
    navigate('/employees/new');
  };

  const getRoleName = (role: string): string => {
    switch (role) {
      case 'driver':
        return 'Водитель';
      case 'waiter':
        return 'Официант';
      case 'cook':
        return 'Повар';
      default:
        return role;
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col md={3}>
          <MemoizedRoleFilter />
        </Col>
        <Col md={2}>
          <MemoizedArchiveFilter />
        </Col>
        <Col md={2}>
          <MemoizedSortFieldFilter />
        </Col>
        <Col md={2}>
          <MemoizedSortDirectionFilter />
        </Col>
        <Col md={3}>
          <FormGroup>
            <Label>&nbsp;</Label>
            <div>
              <Button
                variant="primary"
                onClick={handleAddEmployee}
                className="w-100"
              >
                Добавить сотрудника
              </Button>
            </div>
          </FormGroup>
        </Col>
      </Row>

      {filteredList.length === 0 ? (
        <div className="text-center mt-5">
          <h3>Нет сотрудников для отображения</h3>
          <p className="text-muted">
            Измените параметры фильтрации или добавьте новых сотрудников
          </p>
        </div>
      ) : (
        <Row>
          {filteredList.map((employee) => (
            <Col md={4} key={employee.id} className="mb-4">
              <Card isEmployeeCard={true}>
                <h5>{employee.name}</h5>
                <p className="mb-1">
                  <strong>Телефон:</strong> {employee.phone}
                </p>
                <p className="mb-1">
                  <strong>Дата рождения:</strong> {employee.birthday}
                </p>
                <p className="mb-1">
                  <strong>Должность:</strong>{' '}
                  <span className={`employee-role ${employee.role}`}>
                    {getRoleName(employee.role)}
                  </span>
                </p>
                <p className="mb-3">
                  <strong>Статус:</strong>{' '}
                  <span
                    className={`employee-status ${employee.isArchive ? 'archived' : 'active'}`}
                  >
                    {employee.isArchive ? 'В архиве' : 'Активен'}
                  </span>
                </p>
                <Button
                  variant="primary"
                  onClick={() => handleEditEmployee(employee.id)}
                >
                  Редактировать
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default EmployeesList;
