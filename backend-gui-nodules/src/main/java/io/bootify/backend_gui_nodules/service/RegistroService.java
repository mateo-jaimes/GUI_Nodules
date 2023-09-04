package io.bootify.backend_gui_nodules.service;

import io.bootify.backend_gui_nodules.dto.RegistroDTO;
import io.bootify.backend_gui_nodules.entity.Registro;
import io.bootify.backend_gui_nodules.repository.RegistroRepository;
import io.bootify.backend_gui_nodules.vo.RespuestaServicioVO;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RegistroService {


    Logger logger = LoggerFactory.getLogger(RegistroService.class);

    @Autowired
    private RegistroRepository repository;


    @Transactional
    public RespuestaServicioVO getById(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            Registro registro = repository.findById(id).get();

            RegistroDTO registroDTO = new RegistroDTO();
            registroDTO.setId(registro.getId());
            registroDTO.setFecha(registro.getFecha());
            registroDTO.setUsuarioId(registro.getUsuario().getId());
            registroDTO.setTipoRegistroId(registro.getTipoRegistro().getId());
            registroDTO.setImagenTacId(registro.getImagenTacid().getId());
            registroDTO.setDateCreated(registro.getDateCreated());
            registroDTO.setLastUpdated(registro.getLastUpdated());
            respuesta.setObjeto(registroDTO);
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
            List<Registro> coldatos = repository.findAll();
            List<RegistroDTO> respuestaObj = new ArrayList<>();
            for (Registro registro : coldatos) {
                RegistroDTO registroDTO = new RegistroDTO();
                registroDTO.setId(registro.getId());
                registroDTO.setFecha(registro.getFecha());
                registroDTO.setUsuarioId(registro.getUsuario().getId());
                registroDTO.setTipoRegistroId(registro.getTipoRegistro().getId());
                registroDTO.setImagenTacId(registro.getImagenTacid().getId());
                registroDTO.setDateCreated(registro.getDateCreated());
                registroDTO.setLastUpdated(registro.getLastUpdated());
                respuestaObj.add(registroDTO);
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

    public RespuestaServicioVO crear(Registro registro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = crearTX(registro);
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
    public RespuestaServicioVO crearTX(Registro registro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        repository.save(registro);
        respuesta.setObjeto(registro);
        respuesta.setExitosa(true);
        return respuesta;
    }

    public RespuestaServicioVO actualizar(Registro registro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = actualizarTX(registro);
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
    public RespuestaServicioVO actualizarTX(Registro registro) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        Registro aux = null;
        aux = repository.findById(registro.getId()).get();
        if (aux != null) {
            registro.setId(aux.getId());
            repository.save(registro);
            respuesta.setObjeto(registro);
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
