import { createBrowserRouter } from "react-router";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignupPage"
import App from "../App";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRout from "../components/protectedRoute";
import NewGroupPage from "../pages/NewGroupPage";
import GroupsPage from "../pages/GroupsPage";
import GroupDetailsPage from "../pages/GroupDetailsPage"
import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
const routes = createBrowserRouter([
    {
        // דף הבית הציבורי - עם סרגל ופוטר משלו
        path: "/",
        element: <HomePage />
    },
    {
        // מעטפת האזור האישי (Header + Footer). ללא path כדי שדף הבית יקבל את "/"
        element: <App />,
        children: [
            {
                
                element: < ProtectedRout allowedRole="USER" />,
                children: [
                    {
                        path: "/groups",
                        element: <GroupsPage />
                    },
                    {
                        path: "/groups/new",

                        element: <NewGroupPage />
                    },
                    {
                        path: "groups/:groupId",
                        element: <GroupDetailsPage />
                    },
                    {
                        path: "groups/:groupId/edit",
                        element: <NewGroupPage />
                    }
                ]
            },
            {
                element: <ProtectedRout allowedRole="ADMIN" />,
                children: [
                    {
                        path: "admin",
                        element: <AdminPage />
                    }
                ]
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    }
])
export default routes;