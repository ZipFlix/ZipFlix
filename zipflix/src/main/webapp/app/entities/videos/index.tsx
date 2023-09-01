import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Videos from './videos';
import VideosDetail from './videos-detail';
import VideosUpdate from './videos-update';
import VideosDeleteDialog from './videos-delete-dialog';

const VideosRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Videos />} />
    <Route path="new" element={<VideosUpdate />} />
    <Route path=":id">
      <Route index element={<VideosDetail />} />
      <Route path="edit" element={<VideosUpdate />} />
      <Route path="delete" element={<VideosDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default VideosRoutes;
