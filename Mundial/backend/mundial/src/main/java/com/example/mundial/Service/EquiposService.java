package com.example.mundial.Service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.example.mundial.Repository.EquipoRepository;
import com.example.mundial.model.Equipo;

@Service
public class EquiposService {
    private final EquipoRepository equipoRepository;

    public EquiposService(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    public List<Equipo> getAllEquipos() {
        return equipoRepository.findAll();
    }

    public Equipo getEquipoById(String equipo) {
        return equipoRepository.findById(equipo).orElse(null);
    }

    public Equipo crearEquipo(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    public Equipo actulizar(String equiponombre, Equipo equipoNew) {
        Equipo equipoOld = getEquipoById(equiponombre);
        equipoOld.setPais(equipoNew.getPais());
        equipoOld.setSeleccionador(equipoNew.getSeleccionador());
        return equipoRepository.save(equipoOld);
    }

    public void borrar(String equipoNombre) {
        if (!equipoRepository.existsById(equipoNombre)) {
            throw new NoSuchElementException("No existe el equipo "+ equipoNombre);
        }
        equipoRepository.deleteById(equipoNombre);
    }

}
