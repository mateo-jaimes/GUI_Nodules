package io.bootify.backend_gui_nodules.service;

import io.bootify.backend_gui_nodules.dto.ImagenTacDTO;
import io.bootify.backend_gui_nodules.entity.Imagentac;
import io.bootify.backend_gui_nodules.repository.ImagentacRepository;
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
public class ImagenTacService {


    Logger logger = LoggerFactory.getLogger(ImagenTacService.class);

    @Autowired
    private ImagentacRepository repository;


    @Transactional
    public RespuestaServicioVO getById(Integer id) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            Imagentac imagentac = repository.findById(id).get();

            ImagenTacDTO imagentacDTO = new ImagenTacDTO();
            imagentacDTO.setId(imagentac.getId());
            imagentacDTO.setIdentificador(imagentac.getIdentificador());
            imagentacDTO.setDateCreated(imagentac.getDateCreated());
            imagentacDTO.setLastUpdated(imagentac.getLastUpdated());
            respuesta.setObjeto(imagentacDTO);
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
            List<Imagentac> coldatos = repository.findAll();
            List<ImagenTacDTO> respuestaObj = new ArrayList<>();
            for (Imagentac imagentac : coldatos) {
                ImagenTacDTO imagentacDTO = new ImagenTacDTO();
                imagentacDTO.setId(imagentac.getId());
                imagentacDTO.setIdentificador(imagentac.getIdentificador());
                imagentacDTO.setDateCreated(imagentac.getDateCreated());
                imagentacDTO.setLastUpdated(imagentac.getLastUpdated());
                respuestaObj.add(imagentacDTO);
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

    public RespuestaServicioVO crear(Imagentac imagentac) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = crearTX(imagentac);
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
    public RespuestaServicioVO crearTX(Imagentac imagentac) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        repository.save(imagentac);
        respuesta.setObjeto(imagentac);
        respuesta.setExitosa(true);
        return respuesta;
    }

    public RespuestaServicioVO actualizar(Imagentac imagentac) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        try {
            respuesta = actualizarTX(imagentac);
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
    public RespuestaServicioVO actualizarTX(Imagentac imagentac) {
        RespuestaServicioVO respuesta = new RespuestaServicioVO();
        Imagentac aux = null;
        aux = repository.findById(imagentac.getId()).get();
        if (aux != null) {
            imagentac.setId(aux.getId());
            repository.save(imagentac);
            respuesta.setObjeto(imagentac);
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
