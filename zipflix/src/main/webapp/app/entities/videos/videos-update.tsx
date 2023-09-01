import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IVideos } from 'app/shared/model/videos.model';
import { getEntity, updateEntity, createEntity, reset } from './videos.reducer';

export const VideosUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const videosEntity = useAppSelector(state => state.videos.entity);
  const loading = useAppSelector(state => state.videos.loading);
  const updating = useAppSelector(state => state.videos.updating);
  const updateSuccess = useAppSelector(state => state.videos.updateSuccess);

  const handleClose = () => {
    navigate('/videos');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...videosEntity,
      ...values,
      createdBy: users.find(it => it.id.toString() === values.createdBy.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...videosEntity,
          createdBy: videosEntity?.createdBy?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="zipflixApp.videos.home.createOrEditLabel" data-cy="VideosCreateUpdateHeading">
            Create or edit a Videos
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="videos-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Title" id="videos-title" name="title" data-cy="title" type="text" />
              <ValidatedField label="Description" id="videos-description" name="description" data-cy="description" type="text" />
              <ValidatedField label="Release Date" id="videos-releaseDate" name="releaseDate" data-cy="releaseDate" type="text" />
              <ValidatedField label="Movie Art URL" id="videos-movieArtURL" name="movieArtURL" data-cy="movieArtURL" type="text" />
              <ValidatedField label="Video URL" id="videos-videoURL" name="videoURL" data-cy="videoURL" type="text" />
              <ValidatedField label="Genre" id="videos-genre" name="genre" data-cy="genre" type="text" />
              <ValidatedField id="videos-createdBy" name="createdBy" data-cy="createdBy" label="Created By" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/videos" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default VideosUpdate;
