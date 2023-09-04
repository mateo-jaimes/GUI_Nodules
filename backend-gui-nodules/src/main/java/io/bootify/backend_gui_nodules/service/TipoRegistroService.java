package io.bootify.backend_gui_nodules.service;

import io.bootify.backend_gui_nodules.dto.TipoRegistroDTO;
import io.bootify.backend_gui_nodules.dto.TipoUsuarioDTO;
import io.bootify.backend_gui_nodules.entity.Tiporegistro;
import io.bootify.backend_gui_nodules.repository.TiporegistroRepository;
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
public class TipoRegistroService {

    Logger logger = LoggerFactory.getLogger(TipoUsuarioService.class);

    @Autowired
    private TiporegistroRepository repository;

    @Transactional
    public RespuestaServicioVO getById(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            Tiporegistro tiporegistro = repository.findById(id).orElse(null);
            if (tiporegistro != null) {
                Hibernate.initialize(tiporegistro.getTipoRegistroRegistros());
            }
            respuesta.setObjeto(tiporegistro);
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
            List<Tiporegistro> coldatos = repository.findAll();
            List<TipoRegistroDTO> respuestaObj = new ArrayList<>();
            for (Tiporegistro tiporegistro : coldatos) {
                TipoRegistroDTO tipoRegistroDTO = new TipoRegistroDTO();
                tipoRegistroDTO.setId(tiporegistro.getId());
                tipoRegistroDTO.setTipoRegistro(tiporegistro.getTipoRegistro());
                tipoRegistroDTO.setDateCreated(tiporegistro.getDateCreated());
                tipoRegistroDTO.setLastUpdated(tiporegistro.getLastUpdated());
                respuestaObj.add(tipoRegistroDTO);
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

    public RespuestaServicioVO crear(Tiporegistro tiporegistro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = crearTX(tiporegistro);
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
    public RespuestaServicioVO crearTX(Tiporegistro tiporegistro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        repository.save(tiporegistro);
        respuesta.setObjeto(tiporegistro);
        respuesta.setExitosa(true);
        return respuesta;
    }

    public RespuestaServicioVO actualizar(Tiporegistro tiporegistro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = actualizarTX(tiporegistro);
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
    public RespuestaServicioVO actualizarTX(Tiporegistro tiporegistro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        Tiporegistro aux = null;
        aux = repository.findById(tiporegistro.getId()).get();
        if (aux != null) {
            tiporegistro.setId(aux.getId());
            repository.save(tiporegistro);
            respuesta.setObjeto(tiporegistro);
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
