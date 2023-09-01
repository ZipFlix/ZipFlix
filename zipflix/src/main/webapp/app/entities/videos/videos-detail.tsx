import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './videos.reducer';

export const VideosDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const videosEntity = useAppSelector(state => state.videos.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="videosDetailsHeading">Videos</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{videosEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{videosEntity.title}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{videosEntity.description}</dd>
          <dt>
            <span id="releaseDate">Release Date</span>
          </dt>
          <dd>{videosEntity.releaseDate}</dd>
          <dt>
            <span id="movieArtURL">Movie Art URL</span>
          </dt>
          <dd>{videosEntity.movieArtURL}</dd>
          <dt>
            <span id="videoURL">Video URL</span>
          </dt>
          <dd>{videosEntity.videoURL}</dd>
          <dt>
            <span id="genre">Genre</span>
          </dt>
          <dd>{videosEntity.genre}</dd>
          <dt>Created By</dt>
          <dd>{videosEntity.createdBy ? videosEntity.createdBy.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/videos" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/videos/${videosEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default VideosDetail;
