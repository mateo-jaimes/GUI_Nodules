package io.bootify.backend_gui_nodules.service;

import io.bootify.backend_gui_nodules.dto.TipoUsuarioDTO;
import io.bootify.backend_gui_nodules.dto.UsuarioDTO;
import io.bootify.backend_gui_nodules.entity.Tipousuario;
import io.bootify.backend_gui_nodules.entity.Usuario;
import io.bootify.backend_gui_nodules.repository.UsuarioRepository;
import io.bootify.backend_gui_nodules.vo.RespuestaServicioVO;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {


    Logger logger = LoggerFactory.getLogger(TipoUsuarioService.class);

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private TipoUsuarioService tipoUsuarioService;

    @Transactional
    public RespuestaServicioVO getById(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            Usuario usuario = repository.findById(id).get();

            UsuarioDTO usuarioDTO = new UsuarioDTO();
            usuarioDTO.setId(usuario.getId());
            usuarioDTO.setTipoUsuario(usuario.getTipoUsuario().getId());
            usuarioDTO.setNombre(usuario.getNombre());
            usuarioDTO.setApellido(usuario.getApellido());
            usuarioDTO.setUsername(usuario.getUsername());
            usuarioDTO.setPass(usuario.getPass());
            usuarioDTO.setEmail(usuario.getEmail());
            usuarioDTO.setTelefono(usuario.getTelefono());
            usuarioDTO.setDateCreated(usuario.getDateCreated());
            usuarioDTO.setLastUpdated(usuario.getLastUpdated());
            System.out.println(usuarioDTO);
            respuesta.setObjeto(usuarioDTO);
            respuesta.setExitosa(true);
            respuesta.setDescripcionRespuesta("Transacción exitosa.");
        } catch (DataAccessException e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            logger.error(e.getMessage());
        } catch (Exception e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage());
            logger.error(e.getMessage());
        }
        return respuesta;
    }

    public RespuestaServicioVO getAll() {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            List<Usuario> coldatos = repository.findAll();
            List<UsuarioDTO> respuestaObj = new ArrayList<>();
            for (Usuario usuario : coldatos) {
                System.out.println((usuario.getTipoUsuario().getId()));
                UsuarioDTO usuarioDTO = new UsuarioDTO();
                usuarioDTO.setId(usuario.getId());
                usuarioDTO.setTipoUsuario(usuario.getTipoUsuario().getId());
                usuarioDTO.setNombre(usuario.getNombre());
                usuarioDTO.setApellido(usuario.getApellido());
                usuarioDTO.setUsername(usuario.getUsername());
                usuarioDTO.setPass(usuario.getPass());
                usuarioDTO.setEmail(usuario.getEmail());
                usuarioDTO.setTelefono(usuario.getTelefono());
                usuarioDTO.setDateCreated(usuario.getDateCreated());
                usuarioDTO.setLastUpdated(usuario.getLastUpdated());
                respuestaObj.add(usuarioDTO);
            }
            respuesta.setObjeto(respuestaObj);
            respuesta.setExitosa(true);
        } catch (Exception e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage());
            logger.error(e.getMessage());
        }
        ;
        return respuesta;
    }

    public RespuestaServicioVO crear(Usuario usuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = crearTX(usuario);
        } catch (DataAccessException e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage() + " - " + e.getRootCause().getMessage());
            logger.error(e.getMessage());
        } catch (Exception e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage());
            logger.error(e.getMessage());
        }
        return respuesta;
    }

    @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
    public RespuestaServicioVO crearTX(Usuario usuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        repository.save(usuario);
        respuesta.setObjeto(usuario);
        respuesta.setExitosa(true);
        return respuesta;
    }

    public RespuestaServicioVO actualizar(Usuario usuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = actualizarTX(usuario);
        } catch (DataAccessException e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage() + " - " + e.getRootCause().getMessage());
            logger.error(e.getMessage());
        } catch (Exception e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage());
            logger.error(e.getMessage());
        }
        return respuesta;
    }

    @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
    public RespuestaServicioVO actualizarTX(Usuario usuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        Usuario aux = null;
        aux = repository.findById(usuario.getId()).get();
        if (aux != null) {
            usuario.setId(aux.getId());
            repository.save(usuario);
            respuesta.setObjeto(usuario);
            respuesta.setExitosa(true);
            respuesta.setDescripcionRespuesta("Transacción exitosa.");

        } else {
            respuesta.setObjeto(aux);
            respuesta.setExitosa(false);
            respuesta.setDescripcionRespuesta("No se encontró la entidad.");
        }
        return respuesta;
    }

    public RespuestaServicioVO eliminar(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = eliminarTX(id);
        } catch (DataAccessException e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionRespuesta("Error integridad SQL.");
            respuesta.setDescripcionExcepcion(e.getMessage() + " - " + e.getRootCause().getMessage());
            logger.error(e.getMessage());
        } catch (IllegalArgumentException e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionRespuesta("Entidad nulo, error.");
            respuesta.setDescripcionExcepcion(e.getMessage());
            logger.error(e.getMessage());
        } catch (Exception e) {
            respuesta.setObjeto(null);
            respuesta.setExitosa(false);
            respuesta.setDescripcionExcepcion(e.getMessage());
            logger.error(e.getMessage());
        }
        return respuesta;
    }

    @org.springframework.transaction.annotation.Transactional(rollbackFor = Exception.class)
    public RespuestaServicioVO eliminarTX(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        repository.deleteById(id);
        respuesta.setObjeto(null);
        respuesta.setExitosa(true);
        respuesta.setDescripcionRespuesta("Transacción exitosa.");
        return respuesta;
    }
}
