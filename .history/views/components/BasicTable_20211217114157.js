import React from "react";
import { useTable } from "react-table";
import COLUMNS from './columns'

export const BasicTable = () => {

    useTable({
        columns: COLUMNS,
        data: data,
    })
    return (
        <div>

        </div>
    )
}