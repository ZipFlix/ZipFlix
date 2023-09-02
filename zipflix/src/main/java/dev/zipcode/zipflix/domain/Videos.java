package dev.zipcode.zipflix.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Videos.
 */
@Entity
@Table(name = "videos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Videos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "release_date")
    private String releaseDate;

    @Column(name = "movie_art_url")
    private String movieArtURL;

    @Column(name = "video_url")
    private String videoURL;

    @Column(name = "genre")
    private String genre;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "videoName")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "createdBy", "videoName" }, allowSetters = true)
    private Set<Reviews> reviews = new HashSet<>();

    @ManyToOne
    private User createdBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Videos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Videos title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public Videos description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getReleaseDate() {
        return this.releaseDate;
    }

    public Videos releaseDate(String releaseDate) {
        this.setReleaseDate(releaseDate);
        return this;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getMovieArtURL() {
        return this.movieArtURL;
    }

    public Videos movieArtURL(String movieArtURL) {
        this.setMovieArtURL(movieArtURL);
        return this;
    }

    public void setMovieArtURL(String movieArtURL) {
        this.movieArtURL = movieArtURL;
    }

    public String getVideoURL() {
        return this.videoURL;
    }

    public Videos videoURL(String videoURL) {
        this.setVideoURL(videoURL);
        return this;
    }

    public void setVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }

    public String getGenre() {
        return this.genre;
    }

    public Videos genre(String genre) {
        this.setGenre(genre);
        return this;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Set<Reviews> getReviews() {
        return this.reviews;
    }

    public void setReviews(Set<Reviews> reviews) {
        if (this.reviews != null) {
            this.reviews.forEach(i -> i.setVideoName(null));
        }
        if (reviews != null) {
            reviews.forEach(i -> i.setVideoName(this));
        }
        this.reviews = reviews;
    }

    public Videos reviews(Set<Reviews> reviews) {
        this.setReviews(reviews);
        return this;
    }

    public Videos addReviews(Reviews reviews) {
        this.reviews.add(reviews);
        reviews.setVideoName(this);
        return this;
    }

    public Videos removeReviews(Reviews reviews) {
        this.reviews.remove(reviews);
        reviews.setVideoName(null);
        return this;
    }

    public User getCreatedBy() {
        return this.createdBy;
    }

    public void setCreatedBy(User user) {
        this.createdBy = user;
    }

    public Videos createdBy(User user) {
        this.setCreatedBy(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Videos)) {
            return false;
        }
        return id != null && id.equals(((Videos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Videos{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", releaseDate='" + getReleaseDate() + "'" +
            ", movieArtURL='" + getMovieArtURL() + "'" +
            ", videoURL='" + getVideoURL() + "'" +
            ", genre='" + getGenre() + "'" +
            "}";
    }
}
