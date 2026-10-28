import type { ReactNode } from "react";
import Container from "@mui/material/Container";
import type { Breakpoint } from "@mui/material/styles";

interface PageContainerProps {
    children: ReactNode;
    maxWidth?: Breakpoint;
}

const PageContainer = ({ children, maxWidth = "lg" }: PageContainerProps) => (
    <Container
        component="main"
        maxWidth={maxWidth}
        sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}
    >
        {children}
    </Container>
);

export default PageContainer;
