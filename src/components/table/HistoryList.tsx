import React from "react";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { Skeleton } from "@material-ui/lab";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { Trash as DeleteIcon } from "@styled-icons/fa-solid/Trash";
import { Pen as EditIcon } from "@styled-icons/fa-solid/Pen";
import NextLink from "next/link";
import { UrlObject } from "../../types/url";
import { Mappable, USER } from "../../lib/mapGraphData";
import { useDateFormat } from "../../translations/DateFormatterProvider";

interface Data {
  _id: string;
  time: Date;
  amount: number;
  brand: string;
  username: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  const aVal = a[orderBy];
  const bVal = b[orderBy];
  if (aVal instanceof Date && bVal instanceof Date) {
    if (bVal.getTime() < aVal.getTime()) {
      return -1;
    }
    if (bVal.getTime() > aVal.getTime()) {
      return 1;
    }
  } else {
    if (bVal < aVal) {
      return -1;
    }
    if (bVal > aVal) {
      return 1;
    }
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string | Date },
  b: { [key in Key]: number | string | Date }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data | Mappable;
  label: JSX.Element;
  numeric: boolean;
  width?: number | string;
  disabledSort?: boolean;
}
function getHeadCells(type: Mappable, hasModifications: number) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const headCells: HeadCell[] = [
    {
      id: "time",
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage defaultMessage="Tid" />,
    },
    {
      id: type,
      numeric: false,
      disablePadding: false,
      label: <FormattedMessage defaultMessage="Namn" />,
    },
    {
      id: "amount",
      numeric: true,
      disablePadding: false,
      label: <FormattedMessage defaultMessage="Mängd (Liter)" />,
    },
    hasModifications
      ? {
          id: "_id",
          numeric: true,
          disabledPadding: false,
          disabledSort: true,
          label: <></>,
          width: 64 * hasModifications + 16 * 2,
        }
      : undefined,
  ].filter(Boolean);
  return headCells;
}

interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  type: Mappable;
  hasModifications: number;
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
    type = USER,
    hasModifications,
  } = props;
  const createSortHandler = (property: keyof Data) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {getHeadCells(type, hasModifications).map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            width={headCell.width}
          >
            {headCell.disabledSort ? (
              <Typography>{headCell.label}</Typography>
            ) : (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? (
                      <FormattedMessage defaultMessage="Fallande sortering" />
                    ) : (
                      <FormattedMessage defaultMessage="Stigande sortering" />
                    )}
                  </span>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  title: JSX.Element;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { title } = props;
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        {title}
      </Typography>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    table: {},
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

interface TopListProps {
  title: JSX.Element;
  rows: Data[];
  type: Mappable;
  getDetailsLink?: (item: Data) => UrlObject;
  onDelete?: (item: Data) => void;
  onEdit?: (item: Data) => void;
  loading?: boolean;
}

export default function HistoryList(props: TopListProps) {
  const {
    title,
    type = USER,
    rows = [],
    getDetailsLink,
    onDelete,
    onEdit,
    loading,
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("time");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const format = useDateFormat();

  let hasModifications = 0;
  hasModifications += onDelete ? 1 : 0;
  hasModifications += onEdit ? 1 : 0;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar title={title} />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            hasModifications={hasModifications}
            onRequestSort={handleRequestSort}
            type={type}
          />
          <TableBody>
            {loading
              ? Array.from({ length: 10 }, (k, i) => i).map((i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={3}>
                      <Skeleton animation="wave" />
                    </TableCell>
                  </TableRow>
                ))
              : stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: Data, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow hover tabIndex={-1} key={row._id}>
                        <TableCell>
                          <Typography>{format(row.time)}</Typography>
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row">
                          <Typography>
                            {getDetailsLink ? (
                              <NextLink href={getDetailsLink(row)} passHref>
                                <MuiLink>{row[type]}</MuiLink>
                              </NextLink>
                            ) : (
                              row[type]
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <FormattedNumber
                            value={row.amount}
                            maximumFractionDigits={2}
                            minimumFractionDigits={2}
                          />
                        </TableCell>
                        {hasModifications ? (
                          <TableCell>
                            {onDelete ? (
                              <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => onDelete(row)}
                              >
                                <DeleteIcon size={theme.spacing(2)} />
                              </Button>
                            ) : null}
                            {onEdit ? (
                              <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => onEdit(row)}
                              >
                                <EditIcon size={theme.spacing(2)} />
                              </Button>
                            ) : null}
                          </TableCell>
                        ) : null}
                      </TableRow>
                    );
                  })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}
