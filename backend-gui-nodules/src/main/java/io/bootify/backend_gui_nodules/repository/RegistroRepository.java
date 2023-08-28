package io.bootify.backend_gui_nodules.repository;

import io.bootify.backend_gui_nodules.entity.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Integer> {
}
