import * as React from 'react';
import { Link, BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function Content() {

  return (
    <Pagination
      page={page}
      count={10}
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}

export default function PaginationLink({page, count}) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inbox" element={<Content page={page} count={count}/>} />
      </Routes>
    </BrowserRouter>
  );
}
