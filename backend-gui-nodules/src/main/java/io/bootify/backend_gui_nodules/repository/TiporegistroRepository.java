package io.bootify.backend_gui_nodules.repository;

import io.bootify.backend_gui_nodules.entity.Tiporegistro;
import io.bootify.backend_gui_nodules.entity.Tipousuario;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface TiporegistroRepository extends JpaRepository<Tiporegistro, Integer> {
    @Query("SELECT c FROM Tiporegistro 	c ")
    List<Tiporegistro> getByPage(Pageable pageable);
}
