import { useMemo } from "react";
import { READING_CONSTANTS } from "@/constants/reading.constant";
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
            : READING_CONSTANTS.BOOKS.DEFAULT_PAGE;
        const limit = searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : READING_CONSTANTS.BOOKS.DEFAULT_LIMIT;
        const sort = searchParams.get("sort")
            ? (searchParams.get("sort") as IBookQuery["sort"])
            : READING_CONSTANTS.BOOKS.DEFAULT_SORT;
        const order = searchParams.get("order")
            ? (searchParams.get("order") as IBookQuery["order"])
            : READING_CONSTANTS.BOOKS.DEFAULT_ORDER;
        const value =
            searchParams.get("value") || READING_CONSTANTS.BOOKS.DEFAULT_VALUE;

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
