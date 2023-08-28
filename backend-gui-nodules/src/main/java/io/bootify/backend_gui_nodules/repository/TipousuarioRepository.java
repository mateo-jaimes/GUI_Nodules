package io.bootify.backend_gui_nodules.repository;

import io.bootify.backend_gui_nodules.entity.Tipousuario;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipousuarioRepository extends JpaRepository<Tipousuario, Integer> {
    @Query("SELECT c FROM Tipousuario	c ")
    List<Tipousuario> getByPage(Pageable pageable);
}
