import React from "react";
import { useTable } from "react-table";
import COLUMNS from './columns'

export const BasicTable = (data) => {

    useTable({
        columns: COLUMNS,
        data: data,
    })
    console.log('dataaaaaa',data)
    return (
        <div>

        </div>
    )
}