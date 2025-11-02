import { useMemo } from "react";
import { BOOKS_CONSTANTS } from "@/constants/books.constant";
import type { IBookQuery } from "../models/model";
import { useSearchParams } from "react-router";

/**
 * useBookQuery - Hook for getting and setting book query parameters
 * @returns The book query parameters and setter functions
 */
export const useBookQuery = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const query: IBookQuery = useMemo<IBookQuery>(() => {
        const page = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : BOOKS_CONSTANTS.DEFAULT_PAGE;
        const limit = searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : BOOKS_CONSTANTS.DEFAULT_LIMIT;
        const sort = searchParams.get("sort")
            ? (searchParams.get("sort") as IBookQuery["sort"])
            : BOOKS_CONSTANTS.DEFAULT_SORT;
        const order = searchParams.get("order")
            ? (searchParams.get("order") as IBookQuery["order"])
            : BOOKS_CONSTANTS.DEFAULT_ORDER;
        const value =
            searchParams.get("value") || BOOKS_CONSTANTS.DEFAULT_VALUE;

        return {
            page,
            limit,
            sort,
            order,
            value,
        };
    }, [searchParams]);

    /**
     * setPage - Handler for setting the page
     * @param page - The page number to set
     */
    const setPage = (page: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", page.toString());
        setSearchParams(newParams);
    };

    /**
     * setValue - Handler for setting the value
     * @param value - The search value
     */
    const setValue = (value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set("value", value);
        } else {
            newParams.delete("value");
        }
        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    return {
        query,
        setPage,
        setValue,
    };
};
