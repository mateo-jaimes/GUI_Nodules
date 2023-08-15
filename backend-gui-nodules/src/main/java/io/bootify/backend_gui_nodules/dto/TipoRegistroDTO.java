package io.bootify.backend_gui_nodules.dto;

import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class TipoRegistroDTO {

    private Integer id;
    private String tipoRegistro;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;
}
