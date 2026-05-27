/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.example.mundial.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.mundial.model.Equipo;

public interface EquipoRepository extends JpaRepository<Equipo, String> {
}
