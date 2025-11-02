import { Route } from "react-router";
import { ROUTES_CONSTANTS } from "@/constants/routes.constant";
import { ReadingHomePage } from "@/pages/reading/home";
import { BookListPage } from "@/pages/reading/books/list";
import { BookNewPage } from "@/pages/reading/books/new";
import { BookEditPage } from "@/pages/reading/books/edit";
import { BookDetailPage } from "@/pages/reading/books/detail";

/**
 * ReadingRoutes - The routes for the reading page
 * @returns ReadingRoutes component
 */
export const ReadingRoutes = (
    <>
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().READING().HOME()}
            element={<ReadingHomePage />}
        />
        {/* Book Home Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().LIST()}
            element={<BookListPage />}
        />
        {/* Book New Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().NEW()}
            element={<BookNewPage />}
        />
        {/* Book Edit Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().EDIT()}
            element={<BookEditPage />}
        />
        {/* Book Detail Page */}
        <Route
            path={ROUTES_CONSTANTS.DASHBOARD().READING().BOOKS().DETAIL()}
            element={<BookDetailPage />}
        />
    </>
);
