package io.bootify.backend_gui_nodules.dto;

import lombok.Data;

import java.time.OffsetDateTime;
@Data
public class ParametroDTO {

    private String parametro;
    private String valor;
    private Integer usuarioModifica;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;
}
