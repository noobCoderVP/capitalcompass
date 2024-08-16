// app/layout.jsx
import "../styles/globals.css";
import SideBar from "@/components/SideBar";
import { AuthProvider } from "./context/AuthContext";
import { StockProvider } from "./context/StockContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <link
                    rel="stylesheet"
                    href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                    crossOrigin="anonymous"
                ></link>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>CapitalCompass</title>
            </head>
            <body className="layout">
                <AuthProvider>
                    <StockProvider>
                        <SideBar />
                        <div className="content">
                            <main>{children}</main>
                        </div>
                    </StockProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
