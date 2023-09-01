import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './reviews.reducer';

export const ReviewsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const reviewsEntity = useAppSelector(state => state.reviews.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="reviewsDetailsHeading">Reviews</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{reviewsEntity.id}</dd>
          <dt>
            <span id="message">Message</span>
          </dt>
          <dd>{reviewsEntity.message}</dd>
          <dt>Created By</dt>
          <dd>{reviewsEntity.createdBy ? reviewsEntity.createdBy.login : ''}</dd>
          <dt>Video Name</dt>
          <dd>{reviewsEntity.videoName ? reviewsEntity.videoName.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/reviews" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reviews/${reviewsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ReviewsDetail;
