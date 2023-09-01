package dev.zipcode.zipflix.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import dev.zipcode.zipflix.IntegrationTest;
import dev.zipcode.zipflix.domain.Videos;
import dev.zipcode.zipflix.repository.VideosRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link VideosResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class VideosResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_RELEASE_DATE = "AAAAAAAAAA";
    private static final String UPDATED_RELEASE_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_MOVIE_ART_URL = "AAAAAAAAAA";
    private static final String UPDATED_MOVIE_ART_URL = "BBBBBBBBBB";

    private static final String DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_GENRE = "AAAAAAAAAA";
    private static final String UPDATED_GENRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/videos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VideosRepository videosRepository;

    @Mock
    private VideosRepository videosRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVideosMockMvc;

    private Videos videos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Videos createEntity(EntityManager em) {
        Videos videos = new Videos()
            .title(DEFAULT_TITLE)
            .description(DEFAULT_DESCRIPTION)
            .releaseDate(DEFAULT_RELEASE_DATE)
            .movieArtURL(DEFAULT_MOVIE_ART_URL)
            .videoURL(DEFAULT_VIDEO_URL)
            .genre(DEFAULT_GENRE);
        return videos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Videos createUpdatedEntity(EntityManager em) {
        Videos videos = new Videos()
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .movieArtURL(UPDATED_MOVIE_ART_URL)
            .videoURL(UPDATED_VIDEO_URL)
            .genre(UPDATED_GENRE);
        return videos;
    }

    @BeforeEach
    public void initTest() {
        videos = createEntity(em);
    }

    @Test
    @Transactional
    void createVideos() throws Exception {
        int databaseSizeBeforeCreate = videosRepository.findAll().size();
        // Create the Videos
        restVideosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(videos)))
            .andExpect(status().isCreated());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeCreate + 1);
        Videos testVideos = videosList.get(videosList.size() - 1);
        assertThat(testVideos.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testVideos.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testVideos.getReleaseDate()).isEqualTo(DEFAULT_RELEASE_DATE);
        assertThat(testVideos.getMovieArtURL()).isEqualTo(DEFAULT_MOVIE_ART_URL);
        assertThat(testVideos.getVideoURL()).isEqualTo(DEFAULT_VIDEO_URL);
        assertThat(testVideos.getGenre()).isEqualTo(DEFAULT_GENRE);
    }

    @Test
    @Transactional
    void createVideosWithExistingId() throws Exception {
        // Create the Videos with an existing ID
        videos.setId(1L);

        int databaseSizeBeforeCreate = videosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVideosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(videos)))
            .andExpect(status().isBadRequest());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVideos() throws Exception {
        // Initialize the database
        videosRepository.saveAndFlush(videos);

        // Get all the videosList
        restVideosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(videos.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].releaseDate").value(hasItem(DEFAULT_RELEASE_DATE)))
            .andExpect(jsonPath("$.[*].movieArtURL").value(hasItem(DEFAULT_MOVIE_ART_URL)))
            .andExpect(jsonPath("$.[*].videoURL").value(hasItem(DEFAULT_VIDEO_URL)))
            .andExpect(jsonPath("$.[*].genre").value(hasItem(DEFAULT_GENRE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllVideosWithEagerRelationshipsIsEnabled() throws Exception {
        when(videosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restVideosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(videosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllVideosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(videosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restVideosMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(videosRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getVideos() throws Exception {
        // Initialize the database
        videosRepository.saveAndFlush(videos);

        // Get the videos
        restVideosMockMvc
            .perform(get(ENTITY_API_URL_ID, videos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(videos.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.releaseDate").value(DEFAULT_RELEASE_DATE))
            .andExpect(jsonPath("$.movieArtURL").value(DEFAULT_MOVIE_ART_URL))
            .andExpect(jsonPath("$.videoURL").value(DEFAULT_VIDEO_URL))
            .andExpect(jsonPath("$.genre").value(DEFAULT_GENRE));
    }

    @Test
    @Transactional
    void getNonExistingVideos() throws Exception {
        // Get the videos
        restVideosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVideos() throws Exception {
        // Initialize the database
        videosRepository.saveAndFlush(videos);

        int databaseSizeBeforeUpdate = videosRepository.findAll().size();

        // Update the videos
        Videos updatedVideos = videosRepository.findById(videos.getId()).get();
        // Disconnect from session so that the updates on updatedVideos are not directly saved in db
        em.detach(updatedVideos);
        updatedVideos
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .movieArtURL(UPDATED_MOVIE_ART_URL)
            .videoURL(UPDATED_VIDEO_URL)
            .genre(UPDATED_GENRE);

        restVideosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVideos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVideos))
            )
            .andExpect(status().isOk());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
        Videos testVideos = videosList.get(videosList.size() - 1);
        assertThat(testVideos.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testVideos.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVideos.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testVideos.getMovieArtURL()).isEqualTo(UPDATED_MOVIE_ART_URL);
        assertThat(testVideos.getVideoURL()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testVideos.getGenre()).isEqualTo(UPDATED_GENRE);
    }

    @Test
    @Transactional
    void putNonExistingVideos() throws Exception {
        int databaseSizeBeforeUpdate = videosRepository.findAll().size();
        videos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, videos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVideos() throws Exception {
        int databaseSizeBeforeUpdate = videosRepository.findAll().size();
        videos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVideos() throws Exception {
        int databaseSizeBeforeUpdate = videosRepository.findAll().size();
        videos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(videos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVideosWithPatch() throws Exception {
        // Initialize the database
        videosRepository.saveAndFlush(videos);

        int databaseSizeBeforeUpdate = videosRepository.findAll().size();

        // Update the videos using partial update
        Videos partialUpdatedVideos = new Videos();
        partialUpdatedVideos.setId(videos.getId());

        partialUpdatedVideos
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .videoURL(UPDATED_VIDEO_URL)
            .genre(UPDATED_GENRE);

        restVideosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVideos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVideos))
            )
            .andExpect(status().isOk());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
        Videos testVideos = videosList.get(videosList.size() - 1);
        assertThat(testVideos.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testVideos.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVideos.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testVideos.getMovieArtURL()).isEqualTo(DEFAULT_MOVIE_ART_URL);
        assertThat(testVideos.getVideoURL()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testVideos.getGenre()).isEqualTo(UPDATED_GENRE);
    }

    @Test
    @Transactional
    void fullUpdateVideosWithPatch() throws Exception {
        // Initialize the database
        videosRepository.saveAndFlush(videos);

        int databaseSizeBeforeUpdate = videosRepository.findAll().size();

        // Update the videos using partial update
        Videos partialUpdatedVideos = new Videos();
        partialUpdatedVideos.setId(videos.getId());

        partialUpdatedVideos
            .title(UPDATED_TITLE)
            .description(UPDATED_DESCRIPTION)
            .releaseDate(UPDATED_RELEASE_DATE)
            .movieArtURL(UPDATED_MOVIE_ART_URL)
            .videoURL(UPDATED_VIDEO_URL)
            .genre(UPDATED_GENRE);

        restVideosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVideos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVideos))
            )
            .andExpect(status().isOk());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
        Videos testVideos = videosList.get(videosList.size() - 1);
        assertThat(testVideos.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testVideos.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testVideos.getReleaseDate()).isEqualTo(UPDATED_RELEASE_DATE);
        assertThat(testVideos.getMovieArtURL()).isEqualTo(UPDATED_MOVIE_ART_URL);
        assertThat(testVideos.getVideoURL()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testVideos.getGenre()).isEqualTo(UPDATED_GENRE);
    }

    @Test
    @Transactional
    void patchNonExistingVideos() throws Exception {
        int databaseSizeBeforeUpdate = videosRepository.findAll().size();
        videos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, videos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVideos() throws Exception {
        int databaseSizeBeforeUpdate = videosRepository.findAll().size();
        videos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videos))
            )
            .andExpect(status().isBadRequest());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVideos() throws Exception {
        int databaseSizeBeforeUpdate = videosRepository.findAll().size();
        videos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(videos)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Videos in the database
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVideos() throws Exception {
        // Initialize the database
        videosRepository.saveAndFlush(videos);

        int databaseSizeBeforeDelete = videosRepository.findAll().size();

        // Delete the videos
        restVideosMockMvc
            .perform(delete(ENTITY_API_URL_ID, videos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Videos> videosList = videosRepository.findAll();
        assertThat(videosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
