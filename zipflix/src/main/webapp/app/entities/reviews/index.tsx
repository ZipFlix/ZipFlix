import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Reviews from './reviews';
import ReviewsDetail from './reviews-detail';
import ReviewsUpdate from './reviews-update';
import ReviewsDeleteDialog from './reviews-delete-dialog';

const ReviewsRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Reviews />} />
    <Route path="new" element={<ReviewsUpdate />} />
    <Route path=":id">
      <Route index element={<ReviewsDetail />} />
      <Route path="edit" element={<ReviewsUpdate />} />
      <Route path="delete" element={<ReviewsDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReviewsRoutes;
