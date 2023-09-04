package io.bootify.backend_gui_nodules.dto;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class TipoUsuarioDTO {
    private Integer id;
    private String rol;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;
}
