import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/auth.store";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Users() {
  const {
    users = [],
    fetchUsers,
    usersLoading,
  } = useAuthStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (usersLoading) return <p>Loading users...</p>;

  if (!Array.isArray(users) || users.length === 0) {
    return <p className="text-muted-foreground">No users found</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>

      {users.map((user) => (
        <Card key={user._id}>
          <CardHeader>
            <CardTitle>{user.email}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <span>{user.name || "Unnamed User"}</span>
            <Badge>{user.role || "user"}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
