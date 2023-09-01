package dev.zipcode.zipflix.domain;

import static org.assertj.core.api.Assertions.assertThat;

import dev.zipcode.zipflix.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VideosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Videos.class);
        Videos videos1 = new Videos();
        videos1.setId(1L);
        Videos videos2 = new Videos();
        videos2.setId(videos1.getId());
        assertThat(videos1).isEqualTo(videos2);
        videos2.setId(2L);
        assertThat(videos1).isNotEqualTo(videos2);
        videos1.setId(null);
        assertThat(videos1).isNotEqualTo(videos2);
    }
}
