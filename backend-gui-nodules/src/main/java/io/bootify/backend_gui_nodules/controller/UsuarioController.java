package io.bootify.backend_gui_nodules.controller;

import io.bootify.backend_gui_nodules.entity.Tipousuario;
import io.bootify.backend_gui_nodules.entity.Usuario;
import io.bootify.backend_gui_nodules.service.TipoUsuarioService;
import io.bootify.backend_gui_nodules.service.UsuarioService;
import io.bootify.backend_gui_nodules.vo.RespuestaServicioVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("Usuario")
public class UsuarioController {

    private static final String origen = "*";

    @Autowired
    private UsuarioService service;

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/getById", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO getById(Integer id) {
        return service.getById(id);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/getAll", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO getAll() {
        return service.getAll();
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public @ResponseBody RespuestaServicioVO crear(@RequestBody Usuario usuario) {
        return service.crear(usuario);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    public @ResponseBody RespuestaServicioVO actualizar(@RequestBody Usuario usuario) {
        return service.actualizar(usuario);
    }

    @CrossOrigin(origins = origen)
    @RequestMapping(value = "/delete", method = RequestMethod.GET)
    public @ResponseBody RespuestaServicioVO eliminar(Integer id) {
        return service.eliminar(id);
    }

}
