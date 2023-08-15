package io.bootify.backend_gui_nodules.service;

import io.bootify.backend_gui_nodules.dto.TipoUsuarioDTO;
import io.bootify.backend_gui_nodules.entity.Tipousuario;
import io.bootify.backend_gui_nodules.repository.TipousuarioRepository;
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
public class TipoUsuarioService {

    Logger logger = LoggerFactory.getLogger(TipoUsuarioService.class);

    @Autowired
    private TipousuarioRepository repository;

    @Transactional
    public RespuestaServicioVO getById(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            Tipousuario tipousuario = repository.findById(id).orElse(null);
            if (tipousuario != null) {
                Hibernate.initialize(tipousuario.getTipoUsuarioUsuarios());
            }
            respuesta.setObjeto(tipousuario);
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
            List<Tipousuario> coldatos = repository.findAll();
            List<TipoUsuarioDTO> respuestaObj = new ArrayList<>();
            for (Tipousuario tipousuario : coldatos) {
                TipoUsuarioDTO tipoUsuarioDTO = new TipoUsuarioDTO();
                tipoUsuarioDTO.setId(tipousuario.getId());
                tipoUsuarioDTO.setRol(tipousuario.getRol());
                tipoUsuarioDTO.setDateCreated(tipousuario.getDateCreated());
                tipoUsuarioDTO.setLastUpdated(tipousuario.getLastUpdated());
                respuestaObj.add(tipoUsuarioDTO);
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

    public RespuestaServicioVO crear(Tipousuario tipousuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = crearTX(tipousuario);
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
    public RespuestaServicioVO crearTX(Tipousuario tipousuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        repository.save(tipousuario);
        respuesta.setObjeto(tipousuario);
        respuesta.setExitosa(true);
        return respuesta;
    }

    public RespuestaServicioVO actualizar(Tipousuario tipousuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = actualizarTX(tipousuario);
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
    public RespuestaServicioVO actualizarTX(Tipousuario tipousuario) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        Tipousuario aux = null;
        aux = repository.findById(tipousuario.getId()).get();
        if (aux != null) {
            tipousuario.setId(aux.getId());
            repository.save(tipousuario);
            respuesta.setObjeto(tipousuario);
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
