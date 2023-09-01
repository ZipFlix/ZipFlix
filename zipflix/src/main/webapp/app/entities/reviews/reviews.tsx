import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IReviews } from 'app/shared/model/reviews.model';
import { getEntities } from './reviews.reducer';

export const Reviews = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const reviewsList = useAppSelector(state => state.reviews.entities);
  const loading = useAppSelector(state => state.reviews.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="reviews-heading" data-cy="ReviewsHeading">
        Reviews
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/reviews/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new Reviews
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {reviewsList && reviewsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Message</th>
                <th>Created By</th>
                <th>Video Name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reviewsList.map((reviews, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/reviews/${reviews.id}`} color="link" size="sm">
                      {reviews.id}
                    </Button>
                  </td>
                  <td>{reviews.message}</td>
                  <td>{reviews.createdBy ? reviews.createdBy.login : ''}</td>
                  <td>{reviews.videoName ? <Link to={`/videos/${reviews.videoName.id}`}>{reviews.videoName.title}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/reviews/${reviews.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/reviews/${reviews.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/reviews/${reviews.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Reviews found</div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
