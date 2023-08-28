package io.bootify.backend_gui_nodules.dto;

import io.bootify.backend_gui_nodules.entity.Usuario;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class ImagenTacDTO {

    private Integer id;
    private String identificador;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;
}
