package io.bootify.backend_gui_nodules.dto;

import io.bootify.backend_gui_nodules.entity.Tipousuario;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
public class UsuarioDTO {

    private Integer id;
    private String nombre;
    private String apellido;
    private String username;
    private String pass;
    private String email;
    private String telefono;
    private Integer tipoUsuario;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;
}
