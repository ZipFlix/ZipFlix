package dev.zipcode.zipflix.domain;

import static org.assertj.core.api.Assertions.assertThat;

import dev.zipcode.zipflix.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ReviewsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reviews.class);
        Reviews reviews1 = new Reviews();
        reviews1.setId(1L);
        Reviews reviews2 = new Reviews();
        reviews2.setId(reviews1.getId());
        assertThat(reviews1).isEqualTo(reviews2);
        reviews2.setId(2L);
        assertThat(reviews1).isNotEqualTo(reviews2);
        reviews1.setId(null);
        assertThat(reviews1).isNotEqualTo(reviews2);
    }
}
