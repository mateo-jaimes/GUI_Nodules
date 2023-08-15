package io.bootify.backend_gui_nodules.dto;

import io.bootify.backend_gui_nodules.entity.Imagentac;
import io.bootify.backend_gui_nodules.entity.Tiporegistro;
import io.bootify.backend_gui_nodules.entity.Usuario;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;

@Data
public class RegistroDTO {

    private Integer id;
    private LocalDate fecha;
    private Integer usuarioId;
    private Integer tipoRegistroId;
    private Integer imagenTacId;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;
}
