package com.devsuperior.dsvendas.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devsuperior.dsvendas.dto.SaleDTO;
import com.devsuperior.dsvendas.entities.Sale;
import com.devsuperior.dsvendas.repositories.SaleRepository;
import com.devsuperior.dsvendas.repositories.SellerRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;
	
	@Autowired
	private SellerRepository sellerRepository;
	
	@Transactional(readOnly = true)
	public Page<SaleDTO> findAll(Pageable pageable){
		sellerRepository.findAll(); // Carrega os vendedores em memoria
		// isso evita que ele faca uma consulta para cada vendedor na consulta abaixo.
		Page<Sale> result = repository.findAll(pageable);
		/* Entendendo o retorno:
		 *  .stream.map     :: converte a colecao original para uma nova colecao (que pode ser de qualquer tipo)
		 *  x -> new Bla(x) :: expressao lambda que diz que para cada x eu faco uma nova instancia da classe passando o x como parametro
		 *  .collect        :: converte o resultado em um List para satsfazer o tipo do retorno.
		 */
		return result.map(sale -> new SaleDTO(sale));
	}
}
