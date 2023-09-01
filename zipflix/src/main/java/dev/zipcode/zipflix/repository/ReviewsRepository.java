package dev.zipcode.zipflix.repository;

import dev.zipcode.zipflix.domain.Reviews;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Reviews entity.
 */
@Repository
public interface ReviewsRepository extends JpaRepository<Reviews, Long> {
    @Query("select reviews from Reviews reviews where reviews.createdBy.login = ?#{principal.username}")
    List<Reviews> findByCreatedByIsCurrentUser();

    default Optional<Reviews> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Reviews> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Reviews> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct reviews from Reviews reviews left join fetch reviews.createdBy left join fetch reviews.videoName",
        countQuery = "select count(distinct reviews) from Reviews reviews"
    )
    Page<Reviews> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct reviews from Reviews reviews left join fetch reviews.createdBy left join fetch reviews.videoName")
    List<Reviews> findAllWithToOneRelationships();

    @Query("select reviews from Reviews reviews left join fetch reviews.createdBy left join fetch reviews.videoName where reviews.id =:id")
    Optional<Reviews> findOneWithToOneRelationships(@Param("id") Long id);
}
