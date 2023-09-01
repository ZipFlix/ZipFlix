package dev.zipcode.zipflix.web.rest;

import dev.zipcode.zipflix.domain.Reviews;
import dev.zipcode.zipflix.repository.ReviewsRepository;
import dev.zipcode.zipflix.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link dev.zipcode.zipflix.domain.Reviews}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ReviewsResource {

    private final Logger log = LoggerFactory.getLogger(ReviewsResource.class);

    private static final String ENTITY_NAME = "reviews";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ReviewsRepository reviewsRepository;

    public ReviewsResource(ReviewsRepository reviewsRepository) {
        this.reviewsRepository = reviewsRepository;
    }

    /**
     * {@code POST  /reviews} : Create a new reviews.
     *
     * @param reviews the reviews to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new reviews, or with status {@code 400 (Bad Request)} if the reviews has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/reviews")
    public ResponseEntity<Reviews> createReviews(@RequestBody Reviews reviews) throws URISyntaxException {
        log.debug("REST request to save Reviews : {}", reviews);
        if (reviews.getId() != null) {
            throw new BadRequestAlertException("A new reviews cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Reviews result = reviewsRepository.save(reviews);
        return ResponseEntity
            .created(new URI("/api/reviews/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /reviews/:id} : Updates an existing reviews.
     *
     * @param id the id of the reviews to save.
     * @param reviews the reviews to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reviews,
     * or with status {@code 400 (Bad Request)} if the reviews is not valid,
     * or with status {@code 500 (Internal Server Error)} if the reviews couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/reviews/{id}")
    public ResponseEntity<Reviews> updateReviews(@PathVariable(value = "id", required = false) final Long id, @RequestBody Reviews reviews)
        throws URISyntaxException {
        log.debug("REST request to update Reviews : {}, {}", id, reviews);
        if (reviews.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reviews.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reviewsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Reviews result = reviewsRepository.save(reviews);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reviews.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /reviews/:id} : Partial updates given fields of an existing reviews, field will ignore if it is null
     *
     * @param id the id of the reviews to save.
     * @param reviews the reviews to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated reviews,
     * or with status {@code 400 (Bad Request)} if the reviews is not valid,
     * or with status {@code 404 (Not Found)} if the reviews is not found,
     * or with status {@code 500 (Internal Server Error)} if the reviews couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/reviews/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Reviews> partialUpdateReviews(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Reviews reviews
    ) throws URISyntaxException {
        log.debug("REST request to partial update Reviews partially : {}, {}", id, reviews);
        if (reviews.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, reviews.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!reviewsRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Reviews> result = reviewsRepository
            .findById(reviews.getId())
            .map(existingReviews -> {
                if (reviews.getMessage() != null) {
                    existingReviews.setMessage(reviews.getMessage());
                }

                return existingReviews;
            })
            .map(reviewsRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, reviews.getId().toString())
        );
    }

    /**
     * {@code GET  /reviews} : get all the reviews.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of reviews in body.
     */
    @GetMapping("/reviews")
    public List<Reviews> getAllReviews(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Reviews");
        if (eagerload) {
            return reviewsRepository.findAllWithEagerRelationships();
        } else {
            return reviewsRepository.findAll();
        }
    }

    /**
     * {@code GET  /reviews/:id} : get the "id" reviews.
     *
     * @param id the id of the reviews to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the reviews, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/reviews/{id}")
    public ResponseEntity<Reviews> getReviews(@PathVariable Long id) {
        log.debug("REST request to get Reviews : {}", id);
        Optional<Reviews> reviews = reviewsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(reviews);
    }

    /**
     * {@code DELETE  /reviews/:id} : delete the "id" reviews.
     *
     * @param id the id of the reviews to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/reviews/{id}")
    public ResponseEntity<Void> deleteReviews(@PathVariable Long id) {
        log.debug("REST request to delete Reviews : {}", id);
        reviewsRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
