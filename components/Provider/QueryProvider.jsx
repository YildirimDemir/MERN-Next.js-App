"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools, } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // staleTime: 60 * 1000,
            staleTime: 0
        }
    }
});

export default function QueryProvider({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            {children}
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500
                    },
                    error: {
                        duration: 3000
                    },
                    style: {
                        marginTop: "10rem",
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "var(--color-grey-700)",
                        boxShadow: "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset"
                    }
                }} />
        </QueryClientProvider>
    )
}
