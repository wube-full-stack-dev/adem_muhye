import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Table,
  Badge,
  Alert,
  Form,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { getUsers, updateUserRole } from "../../services/admin.service";
import {
  getRoleDisplayName,
  getRoleBadgeColor,
  ROLES,
} from "../../utils/roleUtils";

const AdminUsers = () => {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getUsers(token);
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      setMessage({ text: "Server error", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setUpdating(userId);
      const response = await updateUserRole(userId, newRole, token);

      if (response.success) {
        setMessage({
          text: `Role updated to ${getRoleDisplayName(newRole)}`,
          type: "success",
        });
        fetchUsers();
      }
    } catch (error) {
      setMessage({ text: "Server error", type: "danger" });
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-3 px-2 px-md-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center flex-wrap">
          <h5 className="mb-0">User Management</h5>
          <Badge bg="light" text="dark">
            {users.length} Users
          </Badge>
        </Card.Header>

        <Card.Body>
          {message.text && (
            <Alert
              variant={message.type}
              dismissible
              onClose={() => setMessage({ text: "", type: "" })}
            >
              {message.text}
            </Alert>
          )}

          {/* ================= DESKTOP TABLE ================= */}
          <div className="d-none d-md-block">
            <Table striped bordered hover responsive className="align-middle">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Full Name</th>
                  <th>Role</th>
                  <th>Change Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.user_id}>
                    <td>{index + 1}</td>
                    <td>
                      {user.username}
                      {user.user_id === currentUser?.user_id && (
                        <Badge bg="info" className="ms-2">
                          You
                        </Badge>
                      )}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.full_name || "-"}</td>
                    <td>
                      <Badge bg={getRoleBadgeColor(user.role)}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </td>
                    <td>
                      {user.user_id !== currentUser?.user_id ? (
                        <Form.Select
                          size="sm"
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.user_id, e.target.value)
                          }
                          disabled={updating === user.user_id}
                        >
                          <option value={ROLES.STAFF}>Staff</option>
                          <option value={ROLES.MANAGER}>Manager</option>
                          <option value={ROLES.ADMIN}>Admin</option>
                        </Form.Select>
                      ) : (
                        <small className="text-muted">
                          Cannot change own role
                        </small>
                      )}
                    </td>
                    <td>{formatDate(user.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* ================= MOBILE CARD VIEW ================= */}
          <div className="d-md-none">
            {users.map((user) => (
              <Card key={user.user_id} className="mb-3 shadow-sm">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>{user.username}</strong>
                    <Badge bg={getRoleBadgeColor(user.role)}>
                      {getRoleDisplayName(user.role)}
                    </Badge>
                  </div>

                  <div className="small text-muted mb-2">{user.email}</div>

                  <div className="mb-2">
                    <strong>Name:</strong> {user.full_name || "-"}
                  </div>

                  <div className="mb-2">
                    <strong>Joined:</strong> {formatDate(user.created_at)}
                  </div>

                  {user.user_id !== currentUser?.user_id && (
                    <Form.Select
                      className="mt-2"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.user_id, e.target.value)
                      }
                      disabled={updating === user.user_id}
                    >
                      <option value={ROLES.STAFF}>Staff</option>
                      <option value={ROLES.MANAGER}>Manager</option>
                      <option value={ROLES.ADMIN}>Admin</option>
                    </Form.Select>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdminUsers;
